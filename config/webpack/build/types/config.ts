export type BuildMode = 'production' | 'development';

export interface IBuildPaths {
	entry: string;
	build: string;
	html: string;
	src: string;
}

export interface IBuildOptions {
	mode: BuildMode;
	paths: IBuildPaths;
	isDev: boolean;
	port: string | number;
}

export interface IBuildEnv {
	port: string | number;
	mode: BuildMode;
}