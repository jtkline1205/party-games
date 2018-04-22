package tencup.panels;

import java.awt.Color;
import java.awt.Cursor;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import tencup.Cup;
import tencup.Rack;
import tencup.TenCupGame;
import tencup.TenCupUtils;

/*
 * Panel that contains cup buttons for one rack.
 */
@SuppressWarnings("serial")
public class CupsPanel extends JPanel implements ActionListener {
	private TenCupGame myParent;
	private JButton[] cupButtons;

	public CupsPanel(TenCupGame myParent, Rack rackToGenerate, Color teamColor) {
		this.myParent = myParent;
		setBackground(Color.BLACK);
		setLayout(new GridLayout(7, 0));
		generateRackButtons(rackToGenerate, teamColor);
	}

	private void generateRackButtons(Rack rackToGenerate, Color teamColor) {
		int rackSize = rackToGenerate.getSize();
		String direction = "";
		if (rackToGenerate.getRightFacing()) {
			direction = "Right";
		} else {
			direction = "Left";
		}
		initializeButtons(rackSize, teamColor);
		String searchTerm = "Rack " + rackSize + " " + direction;
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(TenCupUtils.MAC_RACKLAYOUTS_FILE_LOC));
			String sCurrentLine;
			while ((sCurrentLine = br.readLine()) != null) {
				if (sCurrentLine.equals(searchTerm)) {
					while ((sCurrentLine = br.readLine()) != null && !sCurrentLine.substring(0, 3).equals("END")) {
						String[] parts = sCurrentLine.split(" ");
						for (int i = 0; i < parts.length; i++) {
							if (parts[i].equals("-"))
								addBlankLabels(1);
							else if (parts[i].equals("0"))
								add(cupButtons[10 - 1]);
							else
								add(cupButtons[new Integer(parts[i]).intValue() - 1]);
						}
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)
					br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}

	private void initializeButtons(int numCups, Color cupColor) {
		cupButtons = new JButton[numCups];

		for (int i = 0; i < numCups; i++) {
			cupButtons[i] = new JButton(i + 1 + "");
			cupButtons[i].setBackground(cupColor);
			cupButtons[i].setOpaque(true);
			cupButtons[i].setCursor(new Cursor(Cursor.CROSSHAIR_CURSOR));
			cupButtons[i].addActionListener(this);
			cupButtons[i].setFocusable(false);
		}
	}

	public void addBlankLabels(int num) {
		for (int i = 0; i < num; i++) {
			add(new JLabel(""));
		}
	}

	public void setAllCupsEnabled(boolean b) {
		for (int i = 0; i < cupButtons.length; i++) {
			cupButtons[i].setEnabled(b);
		}
	}

	/*
	 * Processes CupsPanel button presses.
	 * 
	 * @see
	 * java.awt.event.ActionListener#actionPerformed(java.awt.event.ActionEvent)
	 */
	@Override
	public void actionPerformed(ActionEvent event) {
		myParent.clearOutput();
		JButton buttonPressed = ((JButton) event.getSource());
		buttonPressed.setVisible(false);
		String buttonNumber = (buttonPressed).getText();
		if (myParent.getIslandMode()) {
			myParent.setIslandMode(false);
			myParent.getTeamUp().processMake(buttonNumber, false);
		} else {
			myParent.getTeamUp().processMake(buttonNumber, true);
			if (myParent.getTeamUp().getPlayerUp().getCurrentStreak() < 3) {
				myParent.getTeamUp().switchShooter();
				myParent.setRoundOver(myParent.getTeamUp().turnIsOver());
			}
			myParent.enableMissButton();
		}
		myParent.updateGame();
	}

	/*
	 * Enables valid islands.
	 */
	public void enableIslands(ArrayList<Cup> islandsList) {
		setAllCupsEnabled(false);
		for (Cup c : islandsList) {
			cupButtons[c.getCupNumber() - 1].setEnabled(true);
		}
	}
}