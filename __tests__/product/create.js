const create_product_setup = {
    steps: [
        {type: 'text', focus: 'input[name=name]', value: 'Test item only'},
        {type: 'text', focus: 'input[name=price]', value: '19.00'},
        {type: 'text', focus: 'textarea[name=description]', value: 'this is for testing!'},
        {type: 'file', focus: 'input[name=media]', value: '/Users/mike.nguyen/Downloads/set1.jpeg'},
        {type: 'submit', focus: 'button[type=submit]', value: ''}
    ],
    url: 'http://localhost:3000/create',
    describe: '/create (Product)',
    tests: [
        { it: 'should load without error', asserts: [
            { condition: 'toContain', text: 'Success!Your product has been posted', } ,
            { condition: 'not.toContain', text: 'Opps!Server error in creating product' }
        ]}
    ],
    delay: 10000
}

//const run =  require('../../execute');
//run(create_product_setup);

const timeout = 5000

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('https://google.com')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('should load without error', async () => {
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('google')
    })
  },
  timeout
)