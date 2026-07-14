import Map "mo:core/Map";

module {
  type OldLead = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    termsAccepted : Bool;
    var amountPaid : Text;
    var soldBy : Text;
    createdAt : Int;
  };

  type NewLead = {
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

  type OldActor = {
    leads : Map.Map<Nat, OldLead>;
    state : { var nextLeadId : Nat };
  };

  type NewActor = {
    leads : Map.Map<Nat, NewLead>;
    state : { var nextLeadId : Nat };
  };

  public func migration(old : OldActor) : NewActor {
    let newLeads = old.leads.map<Nat, OldLead, NewLead>(
      func(_id, lead) {
        {
          id = lead.id;
          name = lead.name;
          phone = lead.phone;
          email = lead.email;
          termsAccepted = lead.termsAccepted;
          var amountPaid = lead.amountPaid;
          var soldBy = lead.soldBy;
          var pendingAmount = "";
          createdAt = lead.createdAt;
        };
      }
    );
    {
      leads = newLeads;
      state = old.state;
    };
  };
};
