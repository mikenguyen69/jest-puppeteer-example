const login = {
    steps: [
        {type: 'text', focus: 'input[name=email]', value: 'mike@test.com'},
        {type: 'text', focus: 'input[name=password]', value: 'mikenguyen'},
        {type: 'submit', focus: 'button[type=submit]', value: ''}
    ],
    url: 'https://hn-container.firebaseapp.com/login',
    describe: '/login',
    tests: [
        { it: 'should load without error', asserts: [
            { condition: 'toContain', text: 'Mike', } ,
            { condition: 'toContain', text: 'logout' }
        ]}
    ],
    delay: 10000
}

const testRunner =  require('../../execute');
testRunner.run(login);
