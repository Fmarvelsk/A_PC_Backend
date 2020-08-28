const express = require('express');
const candidate = require('../models/candidateModels')

const candidateRoute = express.Router();

candidateRoute.get('/candidateList', (req, res, next)=> {
    candidate.find()
    .then(data => 
        res.json(data))
        
    .catch(err =>
        next(err))
})

candidateRoute.post('/addCandidate', (req, res, next) => {
    candidate.create(new Candidate(req.body))
    .then(data => {
        res.json(data)
        res.statusCode = 200
        .catch(err => {
            return next(err)
        })
    })
})
candidateRoute.get('/candidate/:id', (req, res, next) => {
    candidate.findById(req.params.id)
    .then(candidate => res.json(candidate))
    .catch(err => next(err))
})

candidateRoute.delete('/delCandidate/:id', (req, res, next) => {
    candidate.findByIdAndDelete(req.params.id)
    .then( ()=>{
        res.json('Candidate deleted')
    })
    .catch(err => {
        err = 'Cannot find user',
        res.statusMessage = err;
        return next(err)
        
    })
})

candidateRoute.put('/updateCandidate/:id', (req, res, next) => {
    candidate.findByIdAndUpdate(req.params.id, {
        $set: {
            accessor: req.body.accessor
        }  
      })
    .then(data => res.json(data))
    .catch(err => next(err))
} )

module.exports = candidateRoute;