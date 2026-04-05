/**
 * The canonical profile shape for the course.
 *
 * This interface is the single source of truth for "what a profile looks like"
 * across every module. Module 1's project renders it, Module 2 types forms
 * against it, and Module 3 will refactor it into a derived/$state-backed store.
 *
 * Keep this shape stable — downstream lessons import from here.
 */
export interface Profile {
	name: string;
	role: string;
	location: string;
	bio: string;
	yearsExperience: number;
	available: boolean;
	skills: readonly string[];
	stats: {
		projects: number;
		clients: number;
		commits: number;
	};
}
