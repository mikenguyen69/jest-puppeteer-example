
module.exports.run = function(testSetup) {
    const timeout = 15000;
    
    describe(
        testSetup.describe,
        () => {
            let page 
            beforeAll(async () => {
                page = await global.__BROWSER__.newPage()
    
                for(var i=0; i < testSetup.steps.length; i++) {
                    var input = testSetup.steps[i];

                    if (input.type === 'link') {
                        await page.goto(input.value);
                    }
                    else if (input.type === 'text') {
                        await handleTextInput(page, input);
                    }
                    else if (input.type === 'file') {
                        await handleFileInput(page, input);
                    }
                    else if (input.type === 'submit') {
                        await handleSubmit(page, input);
                    }
                    else if (input.type === 'delay') {
                        await page.waitFor(input.value);
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
    const fileInput = await page.$(input.focus);
    await fileInput.uploadFile(input.value);
}

async function handleSubmit(page, input) {
    
    // const submitBtn = await page.$(input.focus);
    // await submitBtn.click();
    await page.$eval(input.focus, elem => elem.click());
}