import {ChatOpenAI} from '@langchain/openai'
import {PromptTemplate} from '@langchain/core/prompts'
import 'dotenv/config'

const llm = new ChatOpenAI({
	model: 'qwen-plus',
	apiKey: process.env.DASHSCOPE_API_KEY,
	configuration: {
		baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
	},
})

// 系统提示模板（使用正确的双花括号）
const systemPromptTemplate = PromptTemplate.fromTemplate(`
  我是{{teamName}}的AI机器人，名叫{{botName}}。
  我的性格特点：{{personality}}。
  回答时必须使用{{language}}语言。
`)

// 用户提示模板（使用正确的双花括号）
const userPromptTemplate = PromptTemplate.fromTemplate(`
  当前用户问题：{{question}}
  历史对话：{{history}}
  
  请根据以下规则回答：
  1. 保持口语化
  2. 长度不超过100字
  3. 如果问题与{{teamName}}无关，引导用户关注团队
`)

async function buildFullPrompt(params) {
	// 替换系统提示词变量
	const systemMessage = await systemPromptTemplate.format({
		teamName: '佳奇团队',
		botName: '朱小宝',
		personality: '幽默且喜欢技术讨论',
		language: '中文',
	})

	// 替换用户提示词变量（注意传递 teamName）
	const userMessage = await userPromptTemplate.format({
		question: params.question,
		history: params.history || '无',
		teamName: '佳奇团队', // 确保模板中的 {{teamName}} 被传递
	})

	return [
		{role: 'system', content: systemMessage},
		{role: 'user', content: userMessage},
	]
}

async function chat(question) { 
	const messages = await buildFullPrompt({
		question: question,
		history: '用户曾询问过团队项目',
	})
	console.log(messages)
	// const response = await llm.invoke(messages)
	// return response.content
}

async function main() {
	const response = await chat('你是谁？')
	console.log(response)
}

const template = 'What is a good name for a company that makes {product}?'
const promptA = new PromptTemplate({template, inputVariables: ['product']})

// We can use the `format` method to format the template with the given input values.
const responseA = await promptA.format({product: 'colorful socks'})
console.log({responseA})

main()
