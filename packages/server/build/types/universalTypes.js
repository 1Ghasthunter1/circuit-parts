"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComponentType = exports.isParentType = exports.isPriority = exports.isChildType = exports.isUserRole = exports.componentTypes = exports.parentTypes = exports.priorities = exports.partStatuses = exports.assemblyStatuses = exports.childTypes = exports.userRoles = void 0;
// Type constants =======================
exports.userRoles = ["admin", "user", "owner"];
exports.childTypes = ["assembly", "part"];
exports.assemblyStatuses = [
    "design in progress",
    "ready for assembly",
    "assembly in progress",
    "design review needed",
    "done",
];
exports.partStatuses = [
    "design in progress",
    "materials need to be ordered",
    "waiting for materials",
    "needs drawing",
    "ready for manufacture",
    "ready for cnc",
    "ready for laser",
    "ready for lathe",
    "ready for mill",
];
exports.priorities = ["low", "normal", "high", "urgent"];
exports.parentTypes = ["assembly", "project"];
exports.componentTypes = ["assembly", "project", "part"];
//type guards and validators
const isUserRole = (value) => {
    return exports.userRoles.includes(value);
};
exports.isUserRole = isUserRole;
const isChildType = (value) => {
    return exports.childTypes.includes(value);
};
exports.isChildType = isChildType;
const isPriority = (value) => {
    return exports.priorities.includes(value);
};
exports.isPriority = isPriority;
const isParentType = (value) => {
    return exports.parentTypes.includes(value);
};
exports.isParentType = isParentType;
const isComponentType = (value) => {
    return exports.componentTypes.includes(value);
};
exports.isComponentType = isComponentType;
//# sourceMappingURL=universalTypes.js.map