const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "sqp_4ebf779960ef2ac5168f5ba11d17e86c47dcee4e",
        options: {
            'sonar.login': 'admin',
            'sonar.password': 'admin1',
            'sonar.projectName': 'sonarqube-react-project',
            'sonar.projectDescription': 'Here I can add a description of my project',
            'sonar.projectKey': 'sonarqube-react-project',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)