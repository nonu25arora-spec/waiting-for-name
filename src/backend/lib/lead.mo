import Types "../types/lead";

module {
  public func newLead(
    id : Nat,
    name : Text,
    phone : Text,
    email : Text,
    termsAccepted : Bool,
    createdAt : Int,
  ) : Types.Lead {
    {
      id;
      name;
      phone;
      email;
      termsAccepted;
      var amountPaid = "";
      var soldBy = "";
      var pendingAmount = "";
      createdAt;
    };
  };
};
