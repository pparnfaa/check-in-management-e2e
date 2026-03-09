module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: [
            'features/step_definitions/**/*.ts',
            'features/support/**/*.ts'
        ],
        paths: ['features/**/*.feature'],
        timeout: 30000,
        format: ['progress', 'summary', 'json:reports/cucumber-report.json', 'html:reports/cucumber-report.html']
    }
};
