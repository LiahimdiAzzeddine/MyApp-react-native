import { User } from "./user";

export interface DemandType {
    id: number;
    user_id: number;
    gtin: string;
    status: 'pending' | 'processing' | 'rejected';
    insist_count: number | null;
    last_insist_at: string | null;
    created_at: string;
    updated_at: string;
    image: string | null;
    titre: string;
    marque: string;
    same_gtin_count:number;
    user:User;
  }
  export function formatDate(dateString:string) {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}h:${minutes}min`;
  }
  