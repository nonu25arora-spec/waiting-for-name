import Map "mo:core/Map";
import Array "mo:core/Array";
import Common "../types/common";
import Types "../types/lead";

mixin (leads : Map.Map<Nat, Types.Lead>, state : { var nextLeadId : Nat }) {
  public func submitLead(
    name : Text,
    phone : Text,
    email : Text,
    termsAccepted : Bool,
  ) : async Types.LeadPublic {
    let id = state.nextLeadId;
    state.nextLeadId += 1;
    let lead : Types.Lead = {
      id;
      name;
      phone;
      email;
      termsAccepted;
      var amountPaid = "";
      var soldBy = "";
      var pendingAmount = "";
      createdAt = Common.now();
    };
    leads.add(id, lead);
    Types.toPublic(lead);
  };

  public query func getAllLeads() : async [Types.LeadPublic] {
    let arr = Array.fromIter(leads.values());
    let sorted = arr.sort(func(a, b) = if (a.createdAt > b.createdAt) #less else if (a.createdAt < b.createdAt) #greater else #equal);
    sorted.map<Types.Lead, Types.LeadPublic>(func(l) { Types.toPublic(l) });
  };

  public func updateLeadAmountPaid(id : Nat, amountPaid : Text) : async Bool {
    switch (leads.get(id)) {
      case (?lead) { lead.amountPaid := amountPaid; true };
      case null { false };
    };
  };

  public func updateLeadSoldBy(id : Nat, soldBy : Text) : async Bool {
    switch (leads.get(id)) {
      case (?lead) { lead.soldBy := soldBy; true };
      case null { false };
    };
  };

  public func updateLeadPendingAmount(id : Nat, pendingAmount : Text) : async Bool {
    switch (leads.get(id)) {
      case (?lead) { lead.pendingAmount := pendingAmount; true };
      case null { false };
    };
  };
  public func deleteLead(id : Nat) : async Bool {
    switch (leads.get(id)) {
      case (?_) { leads.remove(id); true };
      case null { false };
    };
  };
};
