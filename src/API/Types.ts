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
