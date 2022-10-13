export default class ClimbTypeUtils {

    constructor() {}
    parseClimbType(climb) {
        if (climb.type.includes("rope")) {
            if (climb.canLead) {
                if (climb.canTopRope) {
                    return "Lead/Top Rope"
                } else if (!climb.canTopRope) {
                    return "Lead Only"
                }
            } else if (climb.canTopRope && !climb.canLead) {
                return "Top Rope Only"
            }
        } else if (climb.type.includes("boulder")) {
            return "Boulder"
        }
    }

    getType(type) {
        console.log()
        if (type[type.selectedIndex].value === "boulder") {
            return "boulder";
        } else if (type[type.selectedIndex].value === "lead" || type[type.selectedIndex].value === "leadtoprope" || type[type.selectedIndex].value === "toprope") {
            return "rope"
        }
    }
}