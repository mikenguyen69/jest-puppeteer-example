const timeout = 15000;
const steps = [
    {type: 'text', focus: 'input[name=name]', value: 'Test item only'},
    {type: 'text', focus: 'input[name=price]', value: '19.00'},
    {type: 'text', focus: 'textarea[name=description]', value: 'this is for testing!'},
    {type: 'file', focus: 'input[name=media]', value: '/Users/mike.nguyen/Downloads/set1.jpeg'},
]

async function handleTextInput(page, input) {
    await page.focus(input.focus);
    await page.keyboard.type(input.value);
}

async function handleFileInput(page, input) {
    const fileInput = await page.$(input.focus);
    await fileInput.uploadFile(input.value);
}

describe(
    '/create (Product)',
    () => {
        let page 
        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()

            await page.goto('http://localhost:3000/create')
            

            for(var i=0; i < steps.length; i++) {
                var input = steps[i];

                if (input.type === 'text') {
                    await handleTextInput(page, input);
                }
                else if (input.type === 'file') {
                    await handleFileInput(page, input);
                }
            }

            const submitBtn = await page.$('button[type=submit]');
            await submitBtn.click();

            await page.waitFor(10000);

        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it('should load without error', async () => {
            let text = await page.evaluate(() => document.body.textContent)
            //console.log(text);
            expect(text).toContain('Success!Your product has been posted');
            expect(text).not.toContain('Opps!Server error in creating product');
        })
    }
)