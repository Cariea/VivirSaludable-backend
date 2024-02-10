export interface User {
  userId: string,
  name: string,
  role: string
}

export interface ExtendedUser extends User {
  phone: string,
  email: string,
  status: string
}

export interface Pacient extends ExtendedUser {
  program: string
}

export interface Specialist extends ExtendedUser {
  especialtie: string
  pacients: number | Pacient[]
  programs: number | Program[]
}