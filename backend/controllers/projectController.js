const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const PDFDocument = require("pdfkit");

const Project = require("../models/projectModel");
const Tasksheet = require("../models/taskSheetModel");
const ProjectHistory = require("../models/projectHistoryModel");
const TaskSheet = require("../models/taskSheetModel");
const {bucket} = require('../utils/firebase');

exports.showAll = async (req, res) => {
  try {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if(!token){
    return res.status(403).json({ error: 'Unauthorized you need to login first' });
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find({
      company: decoded.user.company ? decoded.user.company : decoded.user._id,
    })
      .skip(skip)
      .limit(limit)
      .populate("custId", "custName");

    if (projects.length <= 0) {
      return res.status(400).json({ error: "No Projects Found" });
    }

    const totalRecords = await Project.countDocuments({
      company: decoded.user.company ? decoded.user.company : decoded.user._id,
    });

    res.status(200).json({
      projects,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching projects: " + error.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(400).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in getProject Controller : " + error.message });
  }
};

exports.myProjects = async (req, res) => {
  try {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if(!token){
    return res.status(403).json({ error: 'Unauthorized you need to login first' });
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get unique project IDs from tasks for the specific company
    const uniqueProjectIds = await TaskSheet.distinct("project", {
      company: decoded.user.company,
      employees: decoded.user._id,
    });

    // Fetch the unique projects using the retrieved project IDs
    const projects = await Project.find({
      _id: { $in: uniqueProjectIds },
    }).populate("custId", "custName");

    res.status(200).json({ projects });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error In My project controller: " + error.message });
  }
};

exports.search = async (req, res) => {
  try {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if(!token){
    return res.status(403).json({ error: 'Unauthorized you need to login first' });
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query = req.query.search;

    const projects = await Project.find({
      company: decoded.user.company ? decoded.user.company : decoded.user._id,
      name: { $regex: query, $options: "i" },
    });

    if (projects.length <= 0) {
      return res.status(400).json({ error: "No Projects Found" });
    }

    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while searching projects: " + error.message });
  }
};

exports.create = async (req, res) => {
  try {
    let {
      name,
      custId,
      completeLevel,
      purchaseOrderNo,
      purchaseOrderDate,
      purchaseOrderValue,
      category,
      startDate,
      endDate,
      advancePay,
      payAgainstDelivery,
      payAfterCompletion,
      remark,
      POCopy,
      Address
    } = req.body;
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if(!token){
    return res.status(403).json({ error: 'Unauthorized you need to login first' });
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    completeLevel = completeLevel === undefined ? 0 : completeLevel;

    if(!Address){
      return res.status(400).json({error:"Address Required..."});
    }
    const address=JSON.parse(Address);


    let POCopyUrl = null;
    if (POCopy && POCopy.length > 0) {
      const base64String = POCopy[0].split(',')[1]; 
      const buffer = Buffer.from(base64String, 'base64'); 

      const fileName = `POCopy/${name}_${Date.now()}.pdf`; 
      const file = bucket.file(fileName);

      // Upload the file to Firebase Storage
      await file.save(buffer, {
        metadata: { contentType: 'application/pdf' }, // Set the content type
      });

      await file.makePublic();

      // Get the public URL of the uploaded file
      POCopyUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }
   
    const newProject = await Project({
      custId,
      name,
      purchaseOrderNo,
      purchaseOrderDate: new Date(purchaseOrderDate),
      purchaseOrderValue,
      category,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      advancePay,
      payAgainstDelivery,
      payAfterCompletion,
      remark,
      completeLevel: completeLevel,
      POCopy:POCopyUrl,
      Address:address,
      projectStatus:
        startDate > new Date()
          ? "upcoming"
          : completeLevel < 100
          ? "inprocess"
          : "finished",
      company: decoded.user.company ? decoded.user.company : decoded.user._id,
    });

    if (newProject) {
      await newProject.save();
      console.log("New Project Created");
      res.status(200).json(newProject);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error while creating Project: " + error.message });
  }
};

exports.exportProjects = async (req, res) => {
  try {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if(!token){
    return res.status(403).json({ error: 'Unauthorized you need to login first' });
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { startDate, endDate, status } = req.params;

    // Build query for projects based on filters
    const query = {
      company: decoded.user.company ? decoded.user.company : decoded.user._id,
      ...(status && { projectStatus: status }), // Include status only if specified
    };

    // Handle startDate and endDate filtering
    if (startDate) {
      query.startDate = { $gte: new Date(startDate) }; // Include projects starting from the provided start date
    }

    if (endDate) {
      query.endDate = { $lte: new Date(endDate) }; // Include projects ending by the provided end date
    } else {
      query.endDate = { $lte: new Date() }; // If no end date is provided, include projects up to the current date
    }

    const projects = await Project.find(query).populate("custId", "custName");

    // Create a new PDF document
    const doc = new PDFDocument();
    const tableWidth = 500;
    const columnCount = 9; // Number of columns after removing "PO No"
    const columnWidth = tableWidth / columnCount;

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=projects_report.pdf"
    );

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(16).text("Projects Report", { align: "center" });
    doc.moveDown();

    // Table header
    const tableHeaders = [
      "S.No",
      "Project Name",
      "Customer",
      "PO Date",
      "PO Value",
      "Category",
      "Start Date",
      "End Date",
      "Project Status",
    ];

    // Draw the header row
    let y = doc.y; // Store the current y position
    doc.fontSize(12).font("Helvetica-Bold");
    tableHeaders.forEach((header, index) => {
      doc.rect(50 + index * columnWidth, y, columnWidth, 30).stroke(); // Draw cell border
      doc.text(header, 50 + index * columnWidth + 5, y + 5, {
        width: columnWidth - 10,
        align: "center",
      }); // Add header text
    });
    y += 30; // Move down for the next row

    // Draw a line below the header
    doc
      .moveTo(50, y)
      .lineTo(50 + tableWidth, y)
      .stroke();
    y += 5; // Move down for the data rows

    // Draw table rows
    doc.fontSize(10).font("Helvetica"); // Decreased font size for data
    projects.forEach((project, index) => {
      const rowData = [
        index + 1,
        project.name,
        project.custId ? project.custId.custName : "N/A",
        project.purchaseOrderDate
          ? project.purchaseOrderDate.toDateString()
          : "N/A",
        project.purchaseOrderValue.toString(),
        project.category,
        project.startDate ? project.startDate.toDateString() : "N/A",
        project.endDate ? project.endDate.toDateString() : "N/A",
        project.projectStatus || "N/A", // Show 'N/A' if project status is not specified
      ];

      const rowHeight = 30; // Default row height
      let maxRowHeight = rowHeight; // Track the maximum height needed for this row

      // Calculate the height needed for each cell based on its content
      rowData.forEach((data, index) => {
        const textHeight = doc.heightOfString(data, {
          width: columnWidth - 10,
        });
        const cellHeight = Math.ceil(textHeight / 10) * 10; // Round up to nearest 10 for height
        if (cellHeight > maxRowHeight) {
          maxRowHeight = cellHeight; // Update max height if current cell needs more space
        }
      });

      // Draw the cells with the calculated height
      rowData.forEach((data, index) => {
        doc
          .rect(50 + index * columnWidth, y, columnWidth, maxRowHeight)
          .stroke(); // Draw cell border
        doc.text(data, 50 + index * columnWidth + 5, y + 5, {
          width: columnWidth - 10,
          align: "center",
          height: maxRowHeight,
        }); // Add cell text
      });

      y += maxRowHeight; // Move down for the next row
    });

    // Draw the outer border of the table
    doc.rect(50, 60, tableWidth, y - 60).stroke(); // Adjust the height as needed

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error("Export error:", error);
    res
      .status(500)
      .json({ error: "Error exporting projects: " + error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(400).json({ error: "Project not found" });
    }

    // Delete tasksheets associated with the project
    await Tasksheet.deleteMany({ _id: { $in: project.tasks } });

    res.status(200).json({ message: "Project Deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while deleting project: " + error.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params; // Get id from request parameters
  const {
    name,
    custId,
    Address,
    completeLevel,
    purchaseOrderNo,
    projectStatus,
    purchaseOrderDate,
    purchaseOrderValue,
    category,
    startDate,
    endDate,
    advancePay,
    payAgainstDelivery,
    payafterCompletion,
    remark,
    POCopy,
  } = req.body;
  const originalData = await Project.findById(id);
  
  const updateData = {
    name,
    custId,
    Address,
    completeLevel,
    purchaseOrderDate,
    projectStatus,
    purchaseOrderNo,
    category,
    startDate,
    endDate,
    advancePay,
    payAgainstDelivery,
    payafterCompletion,
    purchaseOrderValue,
    remark,
  };
  try {
    let changes = [];

    // Helper function to track changes
    const trackChanges = (fieldName, oldValue, newValue) => {
      if (["startDate", "endDate", "purchaseOrderDate"].includes(fieldName)) {
        oldValue = oldValue.toISOString();
      }
      if (typeof newValue === "object" && newValue._id) {
        newValue = new ObjectId(newValue._id);
      }
      if (oldValue.toString() !== newValue.toString()) {
        changes.push({
          projectId: id,
          fieldName: fieldName,
          oldValue: oldValue,
          newValue: newValue,
          changeReason: req.body.changeReason || "Updated via project edit",
        });
      }
    };

    if (originalData.length <= 0) {
      return res.status(400).json({ error: "Project not found" });
    }

    for (const key in updateData) {
      if (updateData[key] !== originalData[key]) {
        trackChanges(key, originalData[key], updateData[key]);
      }
    }

    if (changes.length > 0) {
      await ProjectHistory.insertMany(changes);
    }

    await Project.findByIdAndUpdate(id, { $set: updateData });
    return res.status(200).json({ message: "Project Updated Successfuly" });
  } catch (error) {
    console.error("Error updating project:", error);
    return res
      .status(500)
      .json({ error: "Internal server error: " + error.message });
  }
};
