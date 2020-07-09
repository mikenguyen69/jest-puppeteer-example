const path = require('path');

module.exports.run = function(testSetup) {
    const timeout = 15000;

    describe(
        testSetup.describe,
        () => {
            let page 
            beforeAll(async () => {
                page = await global.__BROWSER__.newPage()
    
                await page.goto(testSetup.url)
                
    
                for(var i=0; i < testSetup.steps.length; i++) {
                    var input = testSetup.steps[i];
    
                    if (input.type === 'text') {
                        await handleTextInput(page, input);
                    }
                    else if (input.type === 'file') {
                        await handleFileInput(page, input);
                    }
                    else if (input.type === 'submit') {
                        await handleSubmit(page, input);
                    }
                }
    
                await page.waitFor(testSetup.delay);
    
            }, timeout)
    
            afterAll(async () => {
                await page.close()
            })
    
            // Assessment
            for(var i=0; i < testSetup.tests.length; i++) {
                var test = testSetup.tests[i];
    
                it(test.it, async () => {
                    let text = await page.evaluate(() => document.body.textContent)
                    //console.log(text);
                    
                    test.asserts.forEach(function(test) {
                        if (test.condition === 'toContain') {
                            expect(text).toContain(test.text);
                        }
                        else if (test.condition === 'not.toContain') {
                            expect(text).not.toContain(test.text);
                        }
                    });
                })
            }
        }
    )
}

async function handleTextInput(page, input) {
    await page.focus(input.focus);
    await page.keyboard.type(input.value);
}

async function handleFileInput(page, input) {
    const file = path.join(__dirname, "__tests__", input.value);
    console.log(file);
    const fileInput = await page.$(input.focus);
    await fileInput.uploadFile(file);
}

async function handleSubmit(page, input) {
    const submitBtn = await page.$(input.focus);
    await submitBtn.click();
}