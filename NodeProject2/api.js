/**
 * Created by anubhavshrimal on 7/6/16.
 */
exports.brandFunction = function (req, res) {
    res.send("brand: "+req.params.brand);
}

exports.brandCategory = function (req, res) {
    console.log(req.body);      // console the form data from he==
    res.send("Brand: "+req.params.brand+"<br>Category: "+req.params.category);
}