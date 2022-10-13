export default class Climb {
    constructor(_id, grade, color, section, type, canLead, canTopRope) {
        this._id = _id;
        this.grade = grade;
        this.color = color;
        this.section = section;
        this.type = type;
        this.canLead = canLead;
        this.canTopRope = canTopRope;

        this.gradeVal = this._getValueOfGrade();
    }

    _getValueOfGrade()
    {
        if(this.type == "boulder")
        {
            let grade = this.grade.substring(1)
            return grade == "B" ? -1 : parseInt(this.grade.substring(1))
        }
        else
            return parseInt(this.grade.substring(2).replaceAll("+", "").replaceAll("-", "")) + this._getPlusMinusModifier() + 20
    }

    _getPlusMinusModifier()
    {
        return (this.type.includes("-") * -.3) + (this.type.includes("+") * .5)
    }
}