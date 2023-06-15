export type Requests = {
  id: string;
  name: string;
  usage: string;
  details: string;
  status: "approved" | "rejected" | "pending";
  date: string;
  actions: string[];
};

export type Customers = {
  id: string;
  name: string;
  email: string;
  mobile: number;
  created: string;
};

export type Vouchers = {
  id: string;
  code: string;
  user: string;
  details: string;
  created: string;
  expires: string;
};

export type VoucherTypes = {
  limit: string;
  type: string;
  company: string;
};
