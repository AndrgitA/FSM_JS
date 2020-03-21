// Виртуальная машина
class SMachine {
    constructor(statement, environment = {}) {
        this.statement = statement;
        this.environment = environment;
    }

    step(statement) {
        const [ _statment, _environment] = statement.reduceSemantic(this.environment);
        this.statement = _statment;
        this.environment = _environment;
    }

    run() {
        const formatString = "STATEMENT :\n%s\n\nENVIRONMENT :\n%o\n\n";
        console.log("RUN MACHINE");
        while (this.statement.reducible) {
            console.log(formatString, this.statement.toString(), this.environment);
        
            this.step(this.statement)
        }
        console.log(formatString, this.statement.toString(), this.environment);
        console.log("STOP MACHINE");
    }
}

module.exports = SMachine;