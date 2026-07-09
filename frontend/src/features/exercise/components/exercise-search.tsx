import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { ListFilterPlus, Plus, Search, X } from "lucide-react";

interface ExerciseSearchProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

export function ExerciseSearch({
    searchQuery,
    setSearchQuery
}: ExerciseSearchProps){
    return (
        <div className="flex mx-auto h-24 w-full max-w-3xl rounded-xl p-4 gap-2">
            <InputGroup className="max-w-xs">
                <InputGroupInput 
                    placeholder="Search exercises..."
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}

                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.currentTarget.blur();
                        }
                    }}
                />
                <InputGroupAddon>
                    <Search className="h-4 w-4"/>
                </InputGroupAddon>
                
                {searchQuery && (
                    <InputGroupAddon align="inline-end" className="pr-3">
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none "
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </InputGroupAddon>
                )}
            </InputGroup>

            <Button>
                <ListFilterPlus className="h-4 w-4" />
            </Button>
            <Button className="ml-auto">
                <Plus className="h-4 w-4" />
                Add Exercise
            </Button>
        </div>
    );
}