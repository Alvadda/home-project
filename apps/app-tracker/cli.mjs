import activeWin from 'active-win'
import axios from 'axios'
import inquirer from 'inquirer'

const mapWindow = (windows) =>
  windows.map((w) => ({
    processName: w.owner.name,
    title: w.title,
  }))

const addTrackingApplication = async (processName, titleDetail, color) => {
  const { data } = await axios.post('http://localhost:3000/api/application', {
    processName,
    titleDetail,
    color,
  })

  console.log('Successfully Added: ', data)
}

const runCLI = async () => {
  const openWindows = mapWindow(activeWin.getOpenWindowsSync())

  const questions = [
    {
      type: 'list',
      name: 'selectedWindow',
      message: 'Select a window to track:',
      choices: openWindows.map((item) => ({
        name: `${item.processName} - ${item.title}`,
        value: item,
      })),
    },
    {
      type: 'input',
      name: 'titleDetail',
      message: (answers) => `You can enter a title selector to track specific state of the Application: 
      ${answers.selectedWindow.title}
      :`,
    },
    {
      type: 'input',
      name: 'color',
      message: 'Enter a hex color code:',
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: (answers) => `is your data correct? 
      Application: ${answers.selectedWindow.processName}
      Title Detail: ${answers.titleDetail}
      Color: ${answers.color}
      :`,
      default: false,
    },
  ]

  const answers = await inquirer.prompt(questions)
  if (!answers.confirm) return

  await addTrackingApplication(answers.selectedWindow.processName, answers.titleDetail, answers.color)
}

runCLI().catch(console.error)
