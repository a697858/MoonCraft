exports.out = function(val)
{
    var val = val.toTellrawExtra ? val.toTellrawExtra() : JSON.stringify(val.toString());
    command("tellraw @a [\"Output: \",{0}]".format(val));
}

exports.chat_message = function(text, color, format, click, hover)
{
    text = text || "";
    var msg = {text: text};

    if(color)
        msg.color = color;

    format = format || {};
    if(format.bold)
        msg.bold = format.bold;
    if(format.italic)
        msg.italic = format.italic;
    if(format.underlined)
        msg.underlined = format.underlined;
    if(format.strikethrough)
        msg.strikethrough = format.strikethrough;

    if(click)
        msg.clickEvent = click;
    if(hover)
        msg.hoverEvent = hover;

    return msg;
}

exports.chat_format = function(bold, italic, underlined, strikethrough)
{
    var format = {};
    if(bold)
        format.bold = true;
    if(italic)
        format.italic = true;
    if(underlined)
        format.underlined = true;
    if(strikethrough)
        format.strikethrough = true;

    return format;
}

exports.chat_event = function(action, value)
{
    return {action: action, value: value};
}

exports.chat_message_array = function()
{
    var extras = [];
    for(var i = 0; i < arguments.length; i++)
        extras[i] = arguments[i].toTellrawExtra ? arguments[i].toTellrawExtra() : JSON.stringify(arguments[i]);

    return "[{0}]".format(extras.join(","));
}

exports.tellraw = function()
{
    var msg = exports.chat_message_array.apply(exports, arguments);
    command("tellraw @a {0}".format(msg));
}
