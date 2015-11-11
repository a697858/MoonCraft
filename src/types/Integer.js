var nextName = require("./../lib/naming.js");

function Integer(startVal, name)
{
    this.name = name || nextName("int");

    startVal = startVal || 0;
    var startVal = typeof startVal.toInteger == "function" ? startVal : (parseInt(startVal) || 0);
    this.set(startVal);
}

Integer.scoreName = scoreName;

Integer.prototype.set = function(val)
{
    if(typeof val.toInteger == "function")
        this.operation("=", val.toInteger().name, Integer.scoreName);
    else if(typeof val == "number")
        command(["scoreboard players set", this.name, Integer.scoreName, val].join(" "));
    else
        throw "Cannot assing '" + val.constructor.name + "' to an Integer";
}

Integer.prototype.add = function(val)
{
    if(typeof val == "object" && typeof val.toInteger == "function")
        this.operation("+=", val.toInteger().name, Integer.scoreName);
    else if(typeof val == "number")
        command(["scoreboard players add", this.name, Integer.scoreName, val].join(" "));
    else
        throw "Cannot add '" + val.constructor.name + "' to an Integer";
}

Integer.prototype.remove = function(val)
{
    if(typeof val == "object" && typeof val.toInteger == "function")
        this.operation("-=", val.toInteger().name, Integer.scoreName);
    else if(typeof val == "number")
        command(["scoreboard players remove", this.name, Integer.scoreName, val].join(" "));
    else
        throw "Cannot remove '" + val.constructor.name + "' to an Integer";
}

Integer.prototype.multiplicate = function(val)
{
    if(typeof val == "object" && typeof val.toInteger == "function")
        this.operation("*=", val.toInteger().name, Integer.scoreName);
    else if(typeof val == "number")
        this.staticOperation("*=", val);
    else
        throw "Cannot multiplicate '" + val.constructor.name + "' with an Integer";
}

Integer.prototype.divide = function(val)
{
    if(typeof val == "object" && typeof val.toInteger == "function")
        this.operation("/=", val.toInteger().name, Integer.scoreName);
    else if(typeof val == "number")
        this.staticOperation("/=", val);
    else
        throw "Cannot divide Integer through '" + val.constructor.name + "'";
}

Integer.prototype.mod = function(val)
{
    if(typeof val == "object" && typeof val.toInteger == "function")
        this.operation("%=", val.toInteger().name, Integer.scoreName);
    else if(typeof val == "number")
        this.staticOperation("%=", val);
    else
        throw "Cannot divide Integer through '" + val.constructor.name + "'";
}

Integer.prototype.operation = function(op, otherName, otherScore)
{
    command(["scoreboard players operation", this.name, Integer.scoreName, op, otherName, otherScore].join(" "));
}

Integer.prototype.staticOperation = function(op, val)
{
    command(["scoreboard players set", "static" + val, Integer.scoreName, val].join(" "));
    this.operation(op, "static" + val.toString(), Integer.scoreName);
}

Integer.prototype.toInteger = function()
{
    return this;
}

Integer.prototype.clone = function(cloneName)
{
    return new Integer(this, cloneName);
}

Integer.prototype.toTellrawExtra = function()
{
    return {score: {objective: Integer.scoreName, name: this.name}};
}

Integer.prototype.isExact = function(val)
{
    return this.isBetween(val, val);
}

Integer.prototype.isBetweenEx = function(min, max)
{
    return this.isBetween(min + 1 || min, max - 1 || max);
}

Integer.prototype.isBetween = function(min, max)
{
    min = typeof min == "number" ? min : -1 * Math.pow(2, 31);
    max = typeof max == "number" ? max : Math.pow(2, 31) - 1;

    return ["scoreboard players test", this.name, Integer.scoreName, min, max].join(" ");
}

module.exports = Integer;