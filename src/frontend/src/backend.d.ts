import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeadPublic {
    id: bigint;
    soldBy: string;
    termsAccepted: boolean;
    name: string;
    createdAt: bigint;
    email: string;
    amountPaid: string;
    phone: string;
    pendingAmount: string;
}
export interface backendInterface {
    deleteLead(id: bigint): Promise<boolean>;
    getAllLeads(): Promise<Array<LeadPublic>>;
    submitLead(name: string, phone: string, email: string, termsAccepted: boolean): Promise<LeadPublic>;
    updateLeadAmountPaid(id: bigint, amountPaid: string): Promise<boolean>;
    updateLeadPendingAmount(id: bigint, pendingAmount: string): Promise<boolean>;
    updateLeadSoldBy(id: bigint, soldBy: string): Promise<boolean>;
}
