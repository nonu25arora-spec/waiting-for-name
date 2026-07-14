import Map "mo:core/Map";

module {
  type Lead = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    termsAccepted : Bool;
    var amountPaid : Text;
    var soldBy : Text;
    createdAt : Int;
  };

  type OldActor = {};

  type NewActor = {
    leads : Map.Map<Nat, Lead>;
    state : { var nextLeadId : Nat };
  };

  public func migration(_ : OldActor) : NewActor {
    {
      leads = Map.empty<Nat, Lead>();
      state = { var nextLeadId = 0 };
    };
  };
};
