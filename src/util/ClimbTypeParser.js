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
}