/*=================================================================================
                                Dependencies
=================================================================================== */
const { checkSchema } = require('express-validator');
// index.js express app use 
const fileUpload = require('express-fileupload')
app.use(fileUpload());




const AdminCreateValidation = checkSchema({
    avatar: {
        custom: {
          options: (value, { req, location, path }) => {
            var ext = '';
            var mimetype = '';
            var mims = ['jpg', 'png', 'gif'];
            var type = 'image'; // application, image
            if(!req.files || !req.files['avatar'] || req.files['avatar'].name == ''){

                return Promise.reject('Avatar field is required.');

            }else{

                mimetype = req.files['avatar'].mimetype.split('/').shift().toLowerCase();
                ext = req.files['avatar'].name.split('.').pop().toLowerCase();
                
                if(mimetype !== type){
                    return Promise.reject(`The post file must be ${type}.`);
                }
                
                if(ext != '' && !mims.includes(ext)){
                    return Promise.reject('The post image must be a file of type: '+mims.join(', '));
                }
            }
            return true;
          },
        },
      },
});


module.exports = {
    AdminCreateValidation,
}
