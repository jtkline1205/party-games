package tencup.panels;

import java.awt.Color;
import java.awt.Cursor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JPanel;

import tencup.TenCupGame;

@SuppressWarnings("serial")
public class ControlsPanel extends JPanel implements ActionListener {

	private TenCupGame parent;
	private JButton missButton;
	private JButton madeIslandButton;
	private JButton rerackButton;
	private JButton switchShooterButton;

	public ControlsPanel(TenCupGame parent) {
		this.parent = parent;
		initializeButtons();
		add(missButton);
		add(madeIslandButton);
		add(rerackButton);
		add(switchShooterButton);
	}

	private void initializeButtons() {
		missButton = initializeControlButton("Miss", true);
		madeIslandButton = initializeControlButton("Made Island", false);
		rerackButton = initializeControlButton("Rerack", false);
		switchShooterButton = initializeControlButton("Switch Shooter", true);
	}

	private JButton initializeControlButton(String text, boolean enabled) {
		JButton controlButton = new JButton(text);
		controlButton.setForeground(Color.BLACK);
		controlButton.setCursor(new Cursor(Cursor.HAND_CURSOR));
		controlButton.addActionListener(this);
		controlButton.setFocusable(false);
		controlButton.setEnabled(enabled);
		return controlButton;
	}

	@Override
	public void actionPerformed(ActionEvent event) {
		JButton buttonPressed = ((JButton) event.getSource());
		if (buttonPressed == missButton) {
			parent.getTeamUp().processMiss();
			parent.getTeamUp().switchShooter();
			parent.setRoundOver(parent.getTeamUp().turnIsOver());
			parent.enableMissButton();
			parent.updateGame();
		} else if (buttonPressed == madeIslandButton) {
			parent.setIslandMode(true);
		} else if (buttonPressed == rerackButton) {
			parent.getTeamUp().useRerack();
			parent.redrawTeamCupsPanel(parent.getTeamUp());
			madeIslandButton.setEnabled(false);
			rerackButton.setEnabled(false);
		} else if (buttonPressed == switchShooterButton) {
			parent.getTeamUp().switchShooter();
			parent.updateGame();
		}
	}

	/*
	 * Set all control buttons to be enabled or disabled.
	 */
	public void setAllControlsEnabled(boolean enabled) {
		missButton.setEnabled(enabled);
		madeIslandButton.setEnabled(enabled);
		rerackButton.setEnabled(enabled);
	}

	public JButton getMissButton() {
		return missButton;
	}

	public JButton getMadeIslandButton() {
		return madeIslandButton;
	}

	public JButton getRerackButton() {
		return rerackButton;
	}

	public JComponent getSwitchShooterButton() {
		return switchShooterButton;
	}

}
