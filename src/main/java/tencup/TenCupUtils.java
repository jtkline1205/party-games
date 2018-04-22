package tencup;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

public class TenCupUtils {
	public static final String MAC_NEIGHBORS_FILE_LOC = "src/main/resources/10RackNeighbors";
	public static final String WINDOWS_NEIGHBORS_FILE_LOC = "src\\main\\resources\\10RackNeighbors";
	public static final String MAC_RACKLAYOUTS_FILE_LOC = "src/main/resources/RackLayouts";
	public static final String WINDOWS_RACKLAYOUTS_FILE_LOC = "src\\main\\resources\\RackLayouts";

	public static ArrayList<Cup> generateCupList(int mySize, BufferedReader br) throws IOException {
		ArrayList<Cup> returnList = new ArrayList<Cup>();
		String sCurrentLine;
		if (mySize < 10) {
			for (int i = 0; i < mySize; i++) {
				returnList.add(new Cup(i + 1, null));
			}
		} else {
			while ((sCurrentLine = br.readLine()) != null) {
				for (int i = 0; i < 10; i++) {
					if (i == 4) {
						returnList.add(new Cup(i + 1, null));
					} else {
						sCurrentLine = br.readLine();
						String[] parts = sCurrentLine.split(" ");
						int cupNumber = new Integer(parts[0]).intValue();
						if (cupNumber == 0)
							cupNumber = 10;
						int tempArraySize = new Integer(parts[1]).intValue();
						int[] tempArray = new int[tempArraySize];
						for (int j = 0; j < tempArraySize; j++) {
							int newNeighbor = new Integer(parts[2 + j]).intValue();
							if (newNeighbor == 0)
								newNeighbor = 10;
							tempArray[j] = newNeighbor;
						}
						returnList.add(new Cup(cupNumber, tempArray));
					}
				}
			}
		}
		return returnList;
	}
}
