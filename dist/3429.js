import "node:module";
import node_os from "node:os";
const getNumCpus = ()=>node_os.availableParallelism?.() ?? node_os.cpus().length;
const parseWorkers = (maxWorkers, numCpus)=>{
    const parsed = Number.parseInt(maxWorkers.toString(), 10);
    if ('string' == typeof maxWorkers && maxWorkers.trim().endsWith('%')) {
        const workers = Math.floor(parsed / 100 * (numCpus ?? getNumCpus()));
        return Math.max(workers, 1);
    }
    return parsed > 0 ? parsed : 1;
};
export { getNumCpus, parseWorkers };
