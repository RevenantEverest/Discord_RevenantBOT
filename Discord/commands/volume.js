function isFloat(n) {
    return n === +n && n !== (n|0);
};

function isInteger(n) {
    return n === +n && n === (n|0)
};

module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!args[1]) return message.channel.send(`Current Volume: ${server.volume}`);
    if(!isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid integer value.");
    if(parseInt(args[1], 10) > 100 || parseInt(args[1], 10) <= 0) return message.channel.send("Please select a volume between 1 and 100.");
    server.volume = args[1];
    if(server.dispatcher) {
      if(isInteger(parseInt(args[1], 10) / 100)) {
        server.dispatcher.setVolume(parseInt(args[1], 10) / 100);
      }else if(isFloat(parseFloat(args[1], 10) / 100)) {
        server.dispatcher.setVolume(parseFloat(args[1], 10) / 100);
      }
    }
    if(args[0] === '') return;
    message.channel.send(`Volume set to: ${args[1]}`);
};

module.exports.config = {
    name: 'volume',
    d_name: 'Volume',
    aliases: [],
    params: { required: false, optional: true, params: 'Number' },
    category: ['music', 'Music'],
    desc: 'Displays current volume or sets volume'
};