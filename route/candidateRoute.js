const express = require('express');
const Candidate = require('../models/candidateModels')
const verifyJWT = require('../validate/verifyToken')

const candidateRoute = express.Router();

candidateRoute.get('/candidateList', (req, res, next)=> {
    Candidate.findById()
    .then(data => 
        res.json(data))
        
    .catch(err =>
        next(err))
})

candidateRoute.post('/addCandidate', verifyJWT, (req, res, next) => {
    Candidate.create(new Candidate(req.body))
    .then(data => {
        res.json(data)
        res.statusCode = 200
        .catch(err => {
            return next(err)
        })
    })
})
candidateRoute.get('/candidate/:id', (req, res, next) => {
    Candidate.findById(req.params.id)
    .then(candidate => res.json(candidate))
    .catch(err => next(err))
})

candidateRoute.delete('/delCandidate/:id', verifyJWT, (req, res, next) => {
    Candidate.findByIdAndDelete(req.params.id)
    .then( ()=>{
        res.json('Candidate deleted')
    })
    .catch(err => {
        err = 'Cannot find user',
        res.statusMessage = err;
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