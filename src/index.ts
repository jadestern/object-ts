class Invitation {
  private when: Date;

  constructor(when: Date) {
    this.when = when;
  }
}

class Ticket {
  private fee: number;

  constructor(fee: number) {
    this.fee = fee;
  }

  getFee(): number {
    return this.fee;
  }
}

class Bag {
  private amount: number;
  private invitation: Invitation | null;
  private ticket: Ticket | null;

  constructor(param1: number | Invitation, param2?: number) {
    if (typeof param1 === "number") {
      this.amount = param1;
      this.invitation = null;
    } else {
      this.invitation = param1;
      this.amount = param2 || 0;
    }

    this.ticket = null;
  }

  hold(ticket: Ticket): number {
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      return 0;
    } else {
      this.setTicket(ticket);
      this.minusAmount(ticket.getFee());
      return ticket.getFee();
    }
  }

  private hasInvitation(): boolean {
    return this.invitation !== null;
  }

  hasTicket(): boolean {
    return this.ticket !== null;
  }

  private setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }

  private minusAmount(amount: number) {
    this.amount -= amount;
  }

  plusAmount(amount: number) {
    this.amount += amount;
  }
}

class Audience {
  private bag: Bag;

  constructor(bag: Bag) {
    this.bag = bag;
  }

  buy(ticket: Ticket): number {
    return this.bag.hold(ticket);
  }
}

class TicketOffice {
  private amount: number;
  private tickets: Ticket[];

  constructor(amount: number, ...tickets: Ticket[]) {
    this.amount = amount;
    this.tickets = tickets;
  }

  sellTicketTo(audience: Audience) {
    this.plusAmount(audience.buy(this.getTicket()));
  }

  private getTicket(): Ticket {
    const result = this.tickets.pop();

    if (result) {
      return result;
    } else {
      throw new Error("not any more.");
    }
  }

  private minusAmount(amount: number) {
    this.amount -= amount;
  }

  private plusAmount(amount: number) {
    this.amount += amount;
  }
}

class TicketSeller {
  private ticketOffice: TicketOffice;

  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  sellTo(audience: Audience) {
    this.ticketOffice.sellTicketTo(audience);
  }

  getTicketOffice(): TicketOffice {
    return this.ticketOffice;
  }
}

class Theater {
  private ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  enter(audience: Audience) {
    this.ticketSeller.sellTo(audience);
  }
}
const ticket = new Ticket(10000);
const ticketOffice = new TicketOffice(0, ticket);
const ticketSeller = new TicketSeller(ticketOffice);
const theater = new Theater(ticketSeller);
const bag = new Bag(20000);
const audience = new Audience(bag);
theater.enter(audience);
console.log(theater);
