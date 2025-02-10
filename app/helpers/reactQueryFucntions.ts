import { useQuery } from "@tanstack/react-query";
import { JkUser } from "../types";
import { createSupClientInstance } from "../utils/supabase/client";
import { supabaseCLientClient } from "../utils/supabase/client";
import { useJobKompassUser } from "./providers/userProvider";
import { queryKeys } from "../jkUtilities_and_Tokens/tokens";
import { getCurrentUser, getUserInfo } from "./functions";

// Centralized authentication helper

