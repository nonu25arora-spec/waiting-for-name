module {
  public type Lead = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    termsAccepted : Bool;
    var amountPaid : Text;
    var soldBy : Text;
    var pendingAmount : Text;
    createdAt : Int;
  };

  // Shared-safe snapshot for API boundaries (no var fields)
  public type LeadPublic = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    termsAccepted : Bool;
    amountPaid : Text;
    soldBy : Text;
    pendingAmount : Text;
    createdAt : Int;
  };

  public func toPublic(lead : Lead) : LeadPublic {
    {
      id = lead.id;
      name = lead.name;
      phone = lead.phone;
      email = lead.email;
      termsAccepted = lead.termsAccepted;
      amountPaid = lead.amountPaid;
      soldBy = lead.soldBy;
      pendingAmount = lead.pendingAmount;
      createdAt = lead.createdAt;
    };
  };
};
