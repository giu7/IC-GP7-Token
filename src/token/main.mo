import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor Token {
    
    let owner: Principal = Principal.fromText("5egea-xer2k-yvk5m-brzr5-zqwpx-xwwtf-rwcvf-gwwwg-yiljp-hh7lr-3qe");
    let totalSupply: Nat = 1000000000;
    let symbol: Text = "GP7";

    private stable var balanceEntries: [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    //only first inizialization
    if (balances.size() < 1) {
        balances.put(owner, totalSupply);
    };

    public query func balanceOf(who: Principal): async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        
        return balance;
    };

    public query func getSymbol(): async Text {
        return symbol;
    };

    public shared(msg) func payOut(): async Text {
        Debug.print("Paying out principal" # debug_show(msg.caller));
        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            let result = await transfer(msg.caller, amount);
            return result;    
        } else {
            return "Already Claimed!";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance > amount) {
            let newFromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance: Nat = toBalance + amount;
            balances.put(to, newToBalance);
            return "SUCCESS";
        } else {
            return "Insufficient Balance";
        }
    };

    public func getCanisterId() : async Principal { 
       return Principal.fromActor(Token);
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        //only first inizialization
        if (balances.size() < 1) {
            balances.put(owner, totalSupply);
        }
    };

}