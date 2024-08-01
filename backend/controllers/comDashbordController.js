const jwt = require('jsonwebtoken');
const Project = require('../models/projectModel');
const Customer = require('../models/customerModel');

exports.dashboard = async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

    async function getCategoryCounts() {
        try {
          const categories = await Project.distinct('category');
          const categoryPromises = categories.map(async (name) => {
            const inprocess = await Project.countDocuments({ company: decoded.userId, projectStatus: 'inprocess', category:name });
            const upcoming = await Project.countDocuments({ company: decoded.userId, projectStatus: 'upcoming', category:name });
            const finished = await Project.countDocuments({ company: decoded.userId, projectStatus: 'finished', category:name });
            return [name, { inprocess, upcoming, finished }];
          });
          const category = Object.fromEntries(await Promise.all(categoryPromises));
          return category;
        } catch (err) {
          console.error(err);
        }
      }

    try {
      const customers = await Customer.countDocuments({company:decoded.userId});
     
      
      const category=await getCategoryCounts();

      console.log(category);
      res.status(200).json(
        {
            category,
            "customers":customers,
        });
    } catch (error) {
      // handle error
      res.status(500).json({error:"Error while getting dashbord info: "+error.message});
    }
  };