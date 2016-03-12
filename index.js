var Bot = require('node-telegram-bot-api')
var bot

if (process.env.NODE_ENV == 'production') {
	bot = new Bot(process.env.BOT_TOKEN, { webHook: { port: process.env.INSIDE_PORT, host: 'localhost' }});
	bot.setWebHook(process.env.OUTSIDE_HOST+':'+process.env.OUTSIDE_PORT+'/bot'+bot.token)
} else {
	bot = new Bot(process.env.BOT_TOKEN, { polling: true });
}
console.log(bot.options)

bot.onText(/^\/start$/, function(msg) {
	bot.sendMessage(msg.from.id, 'Sorry, there\'s not much I can to for you here. See /help for usage tips, or /about to know more about me.')
})

bot.onText(/^\/help$/, function(msg) {
	bot.sendMessage(msg.from.id, 'You can use me as a plain inline command (@clearchatbot), or use /clear in a group chat I\'m in. Oh, /about will tell you more about myself :)')
})

bot.onText(/^\/about$/, function(msg) {
	bot.sendMessage(msg.from.id,
		'[clearchat-bot@github](https://github.com/igorsantos07/clearchat-bot) by @igorsantos07\n'+
		'I have a brother called *Shrugger Bot* (@shruggerbot), he may help you with ¯\_(ツ)_/¯ on your chats.\n'+
		'\n'+
		'Use clears with responsability ;)'
	, { parse_mode: 'Markdown' })
})

bot.on('inline_query', function(msg) {
	bot.answerInlineQuery(msg.id, [{
		type: 'article',
		id: 'clear-20',
		title: '20 lines',
		message_text: '.'.repeat(60),
		description: 'Enough lines to get something hidden with the keyboard open'
	},{
                type: 'article',
                id: 'clear-40',
                title: '40 lines',
                message_text: '.'.repeat(60),
                description: 'Covers space enough for high-end phones'
        },{
                type: 'article',
                id: 'clear-60',
                title: '60 lines',
                message_text: '.'.repeat(60),
               	description: 'Lines enough for most computer fullscreen clients'
       	}])
})

console.log(bot.textRegexpCallbacks)
console.log(bot.onReplyToMessages)
