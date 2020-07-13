const post = {
    steps: [
        // Login
        {type: 'link', focus: '', value: 'https://hn-container.firebaseapp.com/login'},
        {type: 'text', focus: 'input[name=email]', value: 'mike@test.com'},
        {type: 'text', focus: 'input[name=password]', value: 'mikenguyen'},
        {type: 'submit', focus: 'button[type=submit]', value: ''},
        {type: 'delay', focus: '', value: 2000},
        // Post
        {type: 'link', focus: '', value: 'https://hn-container.firebaseapp.com/create'},
        {type: 'delay', focus: '', value: 1000},
        {type: 'text', focus: 'input[name=description]', value: 'A popular search engine'},
        {type: 'text', focus: 'input[name=url]', value: 'https://google.com'},
        {type: 'submit', focus: 'button[type=submit]', value: ''},
    ],
    describe: '/create (New Post)',
    tests: [
        { it: 'should load without error', asserts: [
            { condition: 'toContain', text: 'Next', }
        ]}
    ],
    delay: 3000
}

const testRunner =  require('../../execute');
testRunner.run(post);
