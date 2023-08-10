class Participant {
    constructor(name, balance) {
        this.name = name;
        this.balance = balance;
    }

    stakeTokens(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            return this.balance;
        } else {
            console.log(`${this.name} doesn't have enough tokens to stake.`);
            return 0;
        }
    }
}

class PoSBlockchain {
    constructor() {
        this.participants = [];
    }

    addParticipant(participant) {
        this.participants.push(participant);
    }

    selectBlockCreator() {
        let totalStakes = this.participants.reduce((total, participant) => {
            return total + participant.balance;
        }, 0);
        let randomNumber = Math.random() * 1 * totalStakes;
    
        for (let i = 0; i < this.participants.length; i++) {
            if (randomNumber < this.participants[i].balance) {
                return this.participants[i];
            }
            randomNumber -= this.participants[i].balance;
        }
    }    
}

// Creating participants
const chad = new Participant("Chad", 100);
const gigaChad = new Participant("GigaChad", 150);
const ubermench = new Participant("Ubermench", 200);

// Creating instance of PoSBlockchain and adding participant objects.
const posBlockchain = new PoSBlockchain();
posBlockchain.addParticipant(chad);
posBlockchain.addParticipant(gigaChad);
posBlockchain.addParticipant(ubermench);
posBlockchain.addParticipant(new Participant("Tom", 250));
posBlockchain.addParticipant(new Participant("Sigma", 275));
posBlockchain.addParticipant(new Participant("Alpha", 225));
posBlockchain.addParticipant(new Participant("Beta", 50));
posBlockchain.addParticipant(new Participant("Omega", 30));
posBlockchain.addParticipant(new Participant("Chad", 300));

// Simulating block creation
const blockCreator = posBlockchain.selectBlockCreator();
if (blockCreator) {
    const remainingAmount = blockCreator.stakeTokens(32);
    console.log(`${blockCreator.name} has been chosen to create a block with staked amount of 32 ETH and is left with balance of ${remainingAmount}.`);
} else {
    console.log("No participant available to create a block.");
}