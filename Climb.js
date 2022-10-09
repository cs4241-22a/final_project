class Climb {
    constructor(id, grade, color, section, canLead) {
        this.id = id;
        this.grade = grade;
        this.color = color;
        this.section = section;
        this.canLead = canLead;
    }

    // Getter
    get type() {
        return this.calculateType();
    }
    // Method
    calculateType() {
        if (this.grade.includes("V") || this.grade.includes("v")) {
            return "boulder";
        } else if (this.grade.includes("5.")) {
            return new RopeClimb(this.canLead)
        } else {
            console.log("Error in climb type")
        }
    }
}