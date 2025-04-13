const AsteriskManager = require('asterisk-manager');

const ami = new AsteriskManager(5038, '127.0.0.1', 'admin', 'admin', true);
ami.keepConnected();



const call = (number, variables) => {
    ami.action({
        Action: 'Originate',
        Channel: `SIP/${number}`,         
        Context: 'internal',         
        Exten: '1990',               
        Priority: 1,
        CallerID: 'Sistema',         
        Async: true,
        Variable: variables,
    });
}

module.exports = {
    call,
    close: () => ami.disconnect(),
};