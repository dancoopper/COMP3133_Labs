const http = require('http');

const testCases = [
    {
        name: 'Valid User',
        data: {
            username: 'testuser',
            email: 'test@example.com',
            city: 'New York',
            website: 'http://example.com',
            zipCode: '12345-1234',
            phone: '1-123-123-1234'
        },
        expectedStatus: 201
    },
    {
        name: 'Missing Username',
        data: {
            email: 'test2@example.com',
            city: 'New York',
            website: 'http://example.com',
            zipCode: '12345-1234',
            phone: '1-123-123-1234'
        },
        expectedStatus: 400
    },
    {
        name: 'Short Username',
        data: {
            username: 'abc',
            email: 'test3@example.com',
            city: 'New York',
            website: 'http://example.com',
            zipCode: '12345-1234',
            phone: '1-123-123-1234'
        },
        expectedStatus: 400
    },
    {
        name: 'Long Username',
        data: {
            username: 'a'.repeat(101),
            email: 'test4@example.com',
            city: 'New York',
            website: 'http://example.com',
            zipCode: '12345-1234',
            phone: '1-123-123-1234'
        },
        expectedStatus: 400
    },
    {
        name: 'Invalid Email',
        data: {
            username: 'testuser',
            email: 'invalid-email',
            city: 'New York',
            website: 'http://example.com',
            zipCode: '12345-1234',
            phone: '1-123-123-1234'
        },
        expectedStatus: 400
    },
    {
        name: 'Invalid City',
        data: {
            username: 'testuser',
            email: 'test5@example.com',
            city: 'New York 123',
            website: 'http://example.com',
            zipCode: '12345-1234',
            phone: '1-123-123-1234'
        },
        expectedStatus: 400
    },
    {
        name: 'Invalid Website',
        data: {
            username: 'testuser',
            email: 'test6@example.com',
            city: 'New York',
            website: 'invalid-url',
            zipCode: '12345-1234',
            phone: '1-123-123-1234'
        },
        expectedStatus: 400
    },
    {
        name: 'Invalid Zip Code',
        data: {
            username: 'testuser',
            email: 'test7@example.com',
            city: 'New York',
            website: 'http://example.com',
            zipCode: '12345',
            phone: '1-123-123-1234'
        },
        expectedStatus: 400
    },
    {
        name: 'Invalid Phone',
        data: {
            username: 'testuser',
            email: 'test8@example.com',
            city: 'New York',
            website: 'http://example.com',
            zipCode: '12345-1234',
            phone: '123-123-1234'
        },
        expectedStatus: 400
    }
];

function runTest(testCase) {
    const options = {
        hostname: 'localhost',
        port: 8081,
        path: '/users',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === testCase.expectedStatus) {
                console.log(`[PASS] ${testCase.name}`);
            } else {
                console.log(`[FAIL] ${testCase.name} - Expected ${testCase.expectedStatus}, got ${res.statusCode}`);
                console.log('Response:', data);
            }
        });
    });

    req.on('error', (error) => {
        console.error(`[ERROR] ${testCase.name} - Request failed:`, error.message);
    });

    req.write(JSON.stringify(testCase.data));
    req.end();
}

console.log('Starting validation tests...');
// Run tests sequentially with a small delay to ensure server can handle them
let delay = 0;
testCases.forEach((testCase) => {
    setTimeout(() => {
        runTest(testCase);
    }, delay);
    delay += 500;
});
