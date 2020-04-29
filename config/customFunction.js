module.exports = {
    selectOption: function(status, options) {
        return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$&selected="selected"');
    },
    ifCondition: function(v1, operator, v2, options){
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    },
    isEmpty: function(obj){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    },
    isUserAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/login');
        }
    }
};