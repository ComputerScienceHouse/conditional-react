export interface ErrorInfo {
    message: string,
    stackTrace: string
}

export const DirectorshipTypes = ["Chairman", "Ad-Hoc", "Evaluations", "Financial", "Research and Development", "House Improvements", "OpComm", "History", "Social", "Public Relations"] as const;
export type DirectorshipType = typeof DirectorshipTypes[number]

export interface UserInfo {
    username: string,
    fullName: string,
}

export interface DirectorshipAttendanceRecord {
    approved: boolean,
    committe: DirectorshipType,
    frosh: number[],
    members: string[],
    timestamp: Date
}

export interface SeminarAttendanceRecord {
    approved: boolean,
    name: string,
    frosh: number[],
    members: string[],
    timestamp: Date,
}

export interface IntroEvalsSummary {
    name: string,
    uid: string | null,
    seminars: number,
    directorships: number,
    missed_hms: number,
    signatures: number,
    max_signatures: number,
}

export interface IntroEvalsForm {
    uid: string,
    social_events: string | null,
    comments: string | null,
}
