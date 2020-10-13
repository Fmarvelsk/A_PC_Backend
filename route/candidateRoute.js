const express = require('express');
const Candidate = require('../models/candidateModels')
const verifyJWT = require('../validate/verifyToken')

const candidateRoute = express.Router();

candidateRoute.get('/candidateList', (req, res, next)=> {
    Candidate.find()
    .then(data => 
        res.json(data))
        
    .catch(err =>
        next(err))
})

candidateRoute.post('/addCandidate', (req, res, next) => {
    const { surname } = req.body
    if(surname === null || surname === undefined){
        res.status(400).send({response: "Invalid data"})
    }
    else { 
    Candidate.create(new Candidate(req.body))
    .then(data => {
        res.status(200).json(data)
    })
        .catch(err => {
            return next(err)
        })
    
}
})
candidateRoute.get('/candidate/:id', (req, res, next) => {
    Candidate.findById(req.params.id)
    .then(candidate => res.json(candidate))
    .catch(err => next(err))
})

candidateRoute.delete('/delCandidate/:id', verifyJWT, (req, res, next) => {
    Candidate.findByIdAndDelete(req.params.id)
    .then( (data)=>{
        console.log('Candidate deleted')
        res.status(200).json(data)
    })
    .catch(err => {
        err = 'Cannot find user';
        return next(err)
        
    })
})

candidateRoute.put('/updateCandidate/:id', verifyJWT, (req, res, next) => {
    Candidate.findByIdAndUpdate(req.params.id, {
        $set: {
            accessor: req.body.accessor
        }  
      })
    .then(data => res.json(data))
    .catch(err => next(err))
} )

module.exports = candidateRoute;