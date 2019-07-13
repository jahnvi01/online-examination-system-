const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const char=require('../../db/db');
const pollchar=char.pollchar;
const subjectchar=char.subjectchar;
const auth=require('./config');
router.get('/subject/:subject',(req, res) => {
var subject=req.params.subject;
  pollchar.find({subject})
  .then(testset=>{
      res.json({
          testset
      })
  })

});



router.post('/addquestion',(req, res) => {

var  subject=req.body.subject;
  var  question=req.body.question;
  var  opt1=req.body.opt1;
  var  opt2=req.body.opt2;
  var  opt3=req.body.opt3;
  var  opt4=req.body.opt4;
  var  answer=req.body.answer;
    pollchar.findOne({question})
    .then(questionset=>{
        if(questionset){
              res.json({
              
                message: "question already exists"
            })
        }
        else{
          const newset=new pollchar({
           subject,question,opt1,opt2,opt3,opt4,answer
        });
          newset.save()
          .then(set=>{
              res.json({
                set
                            });
          })

        }
      
    })

        }
    );





    router.delete('/question/:id',(req, res) => {

      var  _id= req.params.id;
    
        pollchar.findOne({_id})
        .then(questionset=>{
            if(questionset){
             
              pollchar.remove({_id})
               .then( set=>{  res.json({
                  
                     message:"successfully deleted"
              
                  })
                }
               )
             }
            else{
        
              res.json({
                  
                message: "question does not exist"
            })
            }
          
        })
  
            }
        );
    
    
















router.get('/subjects',(req, res) => {

  subjectchar.find({})
  .then(subjects=>{
      res.json({
          subjects
      })
  })

});

router.post('/addsub',(req, res) => {

    var  subject= req.body.subject||"physics";
      subjectchar.findOne({subject})
      .then(sub=>{
          if(sub){
                res.json({
                
                  message: "subject already exists"
              })
          }
          else{
            const newsub=new subjectchar({
             subject
          });
            newsub.save()
            .then(sub=>{
                res.json({
                 sub
                });
            })

          }
        
      })

          }
      );
  
  


      router.delete('/:id',(req, res) => {
        var  _id= req.params.id;
          subjectchar.findOne({_id})
          .then(sub=>{
              if(sub){
                subjectchar.remove({_id})
                 .then( subject=>{  res.json({
                    
                      message: sub.subject+" deleted"
                
                    })
                  }
                 )
                }
              else{
          
                res.json({
                    
                  message: "does not exist"
              })
              }
            
          })
    
              }
          );
      
      
  
  
  


module.exports = router;

