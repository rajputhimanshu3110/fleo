const express = require('express');
const Category = require('../dataModels/CatModel');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { red } = require('color-name');
const CatModel = require('../dataModels/CatModel');

router.post('/createcat', [
    body('targetSale', 'Target Sales should not be blank').exists(),
    body('currentSale', 'Current Sales should not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const progress = Number(req.body.currentSale) * 100 / Number(req.body.targetSale);

        if (progress <= 33) {
            progressLabel = 'At risk';
            color = 'Red'
        }
        else if (progress <= 66) {
            progressLabel = 'On Track';
            color = 'Yellow'
        } else {
            progressLabel = 'off track';
            color = 'green'
        }
        if (req.body.parentId) {
            const parent = await CatModel.findById(req.body.parentId)
            level = parent.level + 1
        } else {
            level = 0
        }
        const category = await Category.create({
            parentId: req.body.parentId,
            categoryName: req.body.categoryName,
            targetSale: req.body.targetSale,
            currentSale: req.body.currentSale,
            progress: progress,
            progressLabel: progressLabel,
            color: color,
            level: level

        })
        res.json(category)






    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error ")
    }



})







router.get('/getparent', [
    body('categoryId', 'Category should not be blank').exists(),
    body('level', 'Level should not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        

        let level = Number(req.body.level);
        const parents = []
        catid = req.body.categoryId
        while (level != 0) {
            category = await CatModel.findById(catid)
            catid = category.parentId
            
            level = level - 1;
            if(!catid){
                break;
            }
            parents.push(catid)
        }

        res.json({ parents: parents })


    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error ")
    }



})




router.get('/getchild', [
    body('categoryId', 'Category should not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        

        catid = req.body.categoryId

        childs = await CatModel.find({parentId:catid})
        
        res.json(childs)


    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error ")
    }



})


router.delete('/delchild', [
    body('categoryId', 'Category should not be blank').exists(),
    body('delchilds', 'IS delete child should not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        

        if(req.body.delchild){
            childs = await CatModel.find({parentId:catid})

        }
        del = await CatModel.findByIdAndDelete(req.body.id) 
        


    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error ")
    }



})

module.exports = router
